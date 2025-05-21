provider "aws" {
  region = "us-west-2"

  assume_role {
    role_arn = "arn:aws:iam::532680570724:role/LabRole"
  }
}

terraform {
  backend "s3" {}
}