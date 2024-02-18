module "ingestion" {
	source = "./modules/ingestion"
	providers = {
		aws = aws.London
	}

	ipv4CIDRAllow = var.ipv4CIDRAllow
	ipv6CIDRAllow = var.ipv6CIDRAllow
}

module "processing" {
	source = "./modules/processing"
	providers = {
		aws = aws.London
	}
}

module "supporting" {
	source = "./modules/supporting"
	providers = {
		aws = aws.London
	}
}