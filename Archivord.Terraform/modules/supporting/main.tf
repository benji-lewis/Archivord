terraform {
	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 5.37.0"
		}
	}
}

// Create an SQS queue
resource "aws_sqs_queue" "archivord_queue" {
  name = "Archivord"
}

// Create an SNS topic
resource "aws_sns_topic" "messages_topic" {
  name = "Archivord-Messages"
}
