# Deployment Guide

## Infrastructure

```
User
  ↓
Cloudflare (DNS + CDN + SSL)
  ↓
Tencent Cloud Lightweight Server (Singapore, 2C2G, Ubuntu)
  ↓
Nginx → /var/www/html
```

---

## Initial Server Setup

### 1. Install Nginx

```bash
ssh ubuntu@43.160.219.45
sudo apt update && sudo apt install nginx -y
```

### 2. Configure Nginx

Edit `/etc/nginx/sites-available/default`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name wayknow.tech www.wayknow.tech;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 3. Clone the repository

```bash
sudo rm -rf /var/www/html/*
sudo git clone https://github.com/wayknow/website.git /var/www/html/
sudo git config --global --add safe.directory /var/www/html
```

---

## DNS Setup (Cloudflare)

1. Add site `wayknow.tech` to Cloudflare
2. Update nameservers at domain registrar to Cloudflare's assigned nameservers
3. Set SSL/TLS mode to **Flexible**
4. Enable **Always Use HTTPS**
5. Set up **Email Routing**: `support@wayknow.tech` → `jinchanghu1982@gmail.com`

---

## Daily Workflow

### Update website content

```bash
# Local: edit files → commit → push
git add -A
git commit -m "Describe changes"
git push

# Server: pull latest
ssh ubuntu@43.160.219.45 "cd /var/www/html && sudo git pull"
```

### Check site status

```bash
curl -s -o /dev/null -w "%{http_code}" https://wayknow.tech
```

### View Nginx logs

```bash
ssh ubuntu@43.160.219.45 "sudo tail -f /var/log/nginx/access.log"
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 522 error on HTTPS | Check Cloudflare SSL mode is Flexible |
| 502 Bad Gateway | `sudo systemctl restart nginx` |
| Permission denied on git pull | `sudo git config --global --add safe.directory /var/www/html` |
| DNS not resolving | Check Cloudflare nameservers at registrar |
