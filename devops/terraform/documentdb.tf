resource "aws_docdb_cluster" "docdb_cluster" {
  cluster_identifier      = "tc-queue-docdb"
  engine                  = "docdb"
  master_username         = var.db_username
  master_password         = var.db_password
  db_subnet_group_name    = data.terraform_remote_state.network.outputs.docdb_subnet_group_name
  vpc_security_group_ids  = [data.terraform_remote_state.network.outputs.docdb_sg_id]
  skip_final_snapshot     = true
}

resource "aws_docdb_cluster_instance" "docdb_instance" {
  identifier         = "tc-queue-docdb-instance"
  cluster_identifier = aws_docdb_cluster.docdb_cluster.id
  instance_class     = "db.t3.medium"
  apply_immediately  = true
}