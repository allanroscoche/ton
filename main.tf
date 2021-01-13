provider "aws" {
  region = "us-east-1"

  # Make it faster by skipping something
  #skip_get_ec2_platforms      = true
  #skip_metadata_api_check     = true
  #skip_region_validation      = true
  #skip_credentials_validation = true

  # skip_requesting_account_id should be disabled to generate valid ARN in apigatewayv2_api_execution_arn
  #skip_requesting_account_id = false
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
  #domain_name                 = "terraform-aws-modules.modules.tf"
  #domain_name_certificate_arn = module.acm.this_acm_certificate_arn

  default_stage_access_log_destination_arn = aws_cloudwatch_log_group.logs.arn
  default_stage_access_log_format          = "$context.identity.sourceIp - - [$context.requestTime] \"$context.httpMethod $context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId $context.integrationErrorMessage"

  integrations = {
    "ANY /" = {
      lambda_arn             = module.lambda_function.this_lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }

    "$default" = {
      lambda_arn = module.lambda_function.this_lambda_function_arn
    }

  }
}

#############################################
# Using packaged function from Lambda module
#############################################


module "lambda_function" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 1.0"

  function_name = "ton-test-lambda"
  description   = "My awesome lambda function"
  handler       = "hello.handler"
  runtime       = "nodejs10.x"
  source_path   = "src/hello.js"

  publish = true

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service = "apigateway"
      arn     = module.api_gateway.this_apigatewayv2_api_execution_arn
    }
  }
}
