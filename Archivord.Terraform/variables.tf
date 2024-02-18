variable "ipv4CIDRAllow" {
	description = "The IPv4 CIDR block to allow"
	type        = list
	default     = []
}

variable "ipv6CIDRAllow" {
	description = "The IPv6 CIDR block to allow"
	type        = list
	default     = []
}