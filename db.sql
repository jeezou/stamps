CREATE DATABASE 'stamp';

create table info (
	id serial primary key not null,
	stamp_number int not null,
	produce_country varchar(255) not null,
	serial_number varchar(255) not null,
	serial_theme varchar(255) not null,
	year int not null,
	color varchar(255) not null,
	size varchar(255) not null,
	price real not null,
	stamp_theme varchar(255) not null
);

create table location(
	stamp_id serial primary key not null,
	theme varchar(255) not null,
	country varchar(255) not null,
	volume int not null,
	page int not null,
	position int not null
);
