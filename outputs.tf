# API Gateway
output "this_apigatewayv2_api_api_endpoint" {
  description = "The URI of the API"
  value       = module.api_gateway.this_apigatewayv2_api_api_endpoint
}
output "this_dynamodb_table_policy" {
  description = "The policy of the lambda function"
  value       = data.template_file.dynamodb_policy.rendered
}
