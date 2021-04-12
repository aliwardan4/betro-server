CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid (),
    email VARCHAR NOT NULL,
    master_hash VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE access_tokens (
    id uuid DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    access_token_hash VARCHAR UNIQUE NOT NULL,
    device_id VARCHAR UNIQUE NOT NULL,
    device_display_name VARCHAR,
    created_at timestamptz DEFAULT NOW(),
    accessed_at timestamptz,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE user_rsa_keys (
    id uuid DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    public_key VARCHAR UNIQUE NOT NULL,
    private_key VARCHAR NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE user_sym_keys (
    id uuid DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    sym_key VARCHAR NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE group_policies (
    id uuid DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    key_id uuid NOT NULL,
    name VARCHAR NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_sym_key
      FOREIGN KEY(key_id)
	  REFERENCES user_sym_keys(id)
    ON DELETE CASCADE
);

CREATE TABLE group_follow_approvals (
    id uuid DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    followee_id uuid NOT NULL,/* This means user_id follows followee_id */
    key_id uuid NOT NULL,
    sym_key VARCHAR,
    group_id uuid,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at timestamptz DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_followee
      FOREIGN KEY(followee_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_group
      FOREIGN KEY(group_id)
	  REFERENCES group_policies(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_rsa_key
      FOREIGN KEY(key_id)
	  REFERENCES user_rsa_keys(id)
    ON DELETE CASCADE,
    UNIQUE (user_id, followee_id)
);

CREATE TABLE posts (
    id uuid DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    group_id uuid NOT NULL,
    key_id uuid NOT NULL,
    text_content VARCHAR,
    media_content VARCHAR,
    media_encoding VARCHAR,
    created_at timestamptz DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_group
      FOREIGN KEY(group_id)
	  REFERENCES group_policies(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_sym_key
      FOREIGN KEY(key_id)
	  REFERENCES user_sym_keys(id)
    ON DELETE CASCADE
);
