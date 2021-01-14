provider "aws" {
  region = "us-east-1"
}

resource "aws_cloudwatch_log_group" "logs" {
  name = "ton-poc-logs" 
}

###################
# HTTP API Gateway
###################

module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name = "test-ton-http"
  description   = "My awesome HTTP API Gateway"
  protocol_type = "HTTP"

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }

  create_api_domain_name = false

  default_stage_access_log_destination_arn = aws_cloudwatch_log_group.logs.arn
  default_stage_access_log_format = "$context.identity.sourceIp - - [$context.requestTime] \"$context.httpMethod $context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId $context.integrationErrorMessage"

  integrations = {
    "GET /{id}" = {
      lambda_arn             = module.lambda_function_consulta_funcionario.this_lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }
    "DELETE /{id}" = {
      lambda_arn             = module.lambda_function_apaga_funcionario.this_lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }
    "PUT /{id}" = {
      lambda_arn             = module.lambda_function_atualiza_funcionario.this_lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }
 
    "POST /" = {
      lambda_arn             = module.lambda_function_cria_funcionario.this_lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }

    "$default" = {
      lambda_arn = module.lambda_function_consulta_funcionario.this_lambda_function_arn
    }

  }
}

#############################################
# Using packaged function from Lambda module
#############################################


module "lambda_function_cria_funcionario" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 1.0"

  function_name = "ton-cria-funcionario"
  description   = "Cria Funcionario"
  handler       = "create.handler"
  runtime       = "nodejs10.x"
  source_path   = "src"

  publish = true

  attach_policy_json = true
  policy_json = file("policy.json")

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service = "apigateway"
      arn     = module.api_gateway.this_apigatewayv2_api_execution_arn
    }
  }
}
module "lambda_function_consulta_funcionario" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 1.0"

  function_name = "ton-consulta-funcionario"
  description   = "Consulta Funcionario"
  handler       = "get.handler"
  runtime       = "nodejs10.x"
  source_path   = "src"

  publish = true

  attach_policy_json = true
  policy_json = file("policy.json")

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service = "apigateway"
      arn     = module.api_gateway.this_apigatewayv2_api_execution_arn
    }
  }
}
module "lambda_function_apaga_funcionario" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 1.0"

  function_name = "ton-apaga-funcionario"
  description   = "Consulta Funcionario"
  handler       = "delete.handler"
  runtime       = "nodejs10.x"
  source_path   = "src"

  publish = true

  attach_policy_json = true
  policy_json = file("policy.json")

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service = "apigateway"
      arn     = module.api_gateway.this_apigatewayv2_api_execution_arn
    }
  }
}
module "lambda_function_atualiza_funcionario" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 1.0"

  function_name = "ton-atualiza-funcionario"
  description   = "Consulta Funcionario"
  handler       = "update.handler"
  runtime       = "nodejs10.x"
  source_path   = "src"

  publish = true

  attach_policy_json = true
  policy_json = file("policy.json")

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service = "apigateway"
      arn     = module.api_gateway.this_apigatewayv2_api_execution_arn
    }
  }
}




#######################################
# DynamoDB 
#######################################
resource "aws_dynamodb_table" "ddbtable" {
  name             = "ton-db"
  hash_key         = "id"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  attribute {
    name = "id"
    type = "S"
  }
}

