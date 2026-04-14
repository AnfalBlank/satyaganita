#!/bin/bash

# Script untuk membuat admin user menggunakan API langsung ke Turso

echo "🔧 Creating admin user for Satya Ganita Advisor..."

# Turso credentials
TURSO_URL="libsql://satyaganita-anfal.aws-ap-northeast-1.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzU4NDAwNDUsImlkIjoiMDE5ZDc4MWUtZTUwMS03MGMxLWJhZDUtZGE5NmNmOTVjOTk0IiwicmlkIjoiNWZkNzE3ZTctZDk0OC00ZGQ2LTg4ZjAtODcwNmFlMzg5NDExIn0.p3oK1tXzACwAw0uD1jTLhWDV7Qw40yFrdjSylKD2oPcPn9RaYca385hXeZnWnGTF6JvRq-t0cH2qVrEBE_E0Cw"

# Generate ID using timestamp
ADMIN_ID="admin-$(date +%s)-$(uuidgen 2>/dev/null || echo '001')"

# Insert admin user using turso CLI
echo "📝 Inserting admin user to database..."

turso db execute ${TURSO_URL} --auth-token ${TURSO_AUTH_TOKEN} \
  "INSERT INTO user (id, name, email, email_verified, role, banned, created_at, updated_at)
   VALUES ('${ADMIN_ID}', 'Admin Satya Ganita', 'admin@satyaganita.id', 1, 'admin', 0, datetime('now'), datetime('now'));"

if [ $? -eq 0 ]; then
  echo "✅ Admin user created successfully!"
  echo ""
  echo "📋 Login Details:"
  echo "   URL: http://localhost:3000/admin"
  echo "   Email: admin@satyaganita.id"
  echo ""
  echo "⚠️  IMPORTANT: Set up password through 'Forgot Password' or OAuth login!"
else
  echo "❌ Failed to create admin user. Make sure turso CLI is installed."
  echo "   Install: brew install turso"
fi
