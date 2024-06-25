create table if not exists autores (
id serial primary key,
nome text not null,
idade slmallint
);

create table if not exists livros (
id serial primary key,
autor-id integer not null,
nome text not null,
editora varchar(100),
genero varchar(50) not null,
data_publicacao date,
foregeing key (autor_id) references autores (id)
);

create table if not exists usuarios(
id serial primary key,
nome text not null,
email text not null,
senha text not null
);