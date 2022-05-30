CREATE TABLE chatuser (
	user_id VARCHAR(100) PRIMARY KEY,
	login VARCHAR(60) UNIQUE,
	password VARCHAR(60)
);

CREATE TABLE chatroom (
	room_id SERIAL PRIMARY KEY,
	name VARCHAR(25) UNIQUE,
	closed BOOLEAN DEFAULT false,
	creater_id VARCHAR(100) REFERENCES chatuser(user_id),
	messages JSONB NOT NULL DEFAULT '[]'
);
