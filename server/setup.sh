#!/bin/bash
set -e

echo "=========================================="
echo "  QL 站点 - 阿里云服务器初始化脚本"
echo "=========================================="

echo ""
echo "[1/5] 更新系统并安装 Nginx..."
apt update -y
apt install -y nginx

echo ""
echo "[2/5] 创建站点目录..."
mkdir -p /var/www/ql-site
chown -R www-data:www-data /var/www/ql-site

echo ""
echo "[3/5] 部署 Nginx 配置..."
cp /root/server/nginx-site.conf /etc/nginx/sites-available/ql-site

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/ql-site /etc/nginx/sites-enabled/

echo ""
echo "[4/5]