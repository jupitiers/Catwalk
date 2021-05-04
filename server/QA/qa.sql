CREATE SCHEMA qa;

CREATE TABLE questions (
  questionId integer PRIMARY KEY,
  productId integer,
  body varchar,
  author varchar,
  date varchar,
  email varchar,
  helpful integer,
  reported boolean
);

CREATE TABLE answers (
  answerId integer PRIMARY KEY,
  questionId integer,
  body varchar,
  author varchar,
  date varchar,
  email varchar,
  helpful integer,
  reported boolean
);

CREATE TABLE answerImages (
  imageId integer PRIMARY KEY,
  answerId integer,
  url varchar
);