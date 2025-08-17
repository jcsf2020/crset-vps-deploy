CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2b$12$0w8Uppv4W49q7QfYw3Z6KOf0Qb2i7sP0rA7mN1QmXy1q2ZgF.7aGK')  -- 'admin123'
ON CONFLICT (username) DO NOTHING;

