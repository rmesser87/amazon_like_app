create database if not exists bamazon_db;

use bamazon_db;

create table if not exists products (
item_id integer(10) not null auto_increment primary key,
product_name varchar(255) not null,
department_name varchar(255) not null,
price decimal(12,2) not null,
stock_quantity integer(10) not null default 0
);