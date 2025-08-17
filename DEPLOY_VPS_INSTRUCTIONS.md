# 🚀 CRSET Solutions - Deploy VPS Completo

## 📋 Pré-requisitos

### VPS Recomendada
- **Especificações:** 2GB RAM, 1 vCPU, 40GB SSD
- **Provedores:** Hetzner CX22 / DigitalOcean Basic 2GB / OVH B2-7
- **OS:** Ubuntu 22.04 LTS

### DNS Cloudflare
Configurar registos A (Proxy ON) apontando para IP da VPS:
```
A crsetsolutions.com -> <IP_VPS>
A api -> <IP_VPS>
A admin -> <IP_VPS>
A chat -> <IP_VPS>
A go -> <IP_VPS>
```

## 🛠 Instalação Automática

### 1. Acesso VPS
```bash
ssh -o StrictHostKeyChecking=no root@<IP_VPS>
```

### 2. Preparação Sistema
```bash
# Atualizações
apt-get update -y && apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg ufw fail2ban git

# Docker Engine + Compose
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
yes | ufw enable
```

### 3. Deploy Stack
```bash
# Clonar projeto
mkdir -p /opt/crset && cd /opt/crset
# (Copiar todos os arquivos do crset-vps-deploy para /opt/crset)

# Gerar credenciais
JWT_SECRET=$(openssl rand -hex 32)
ADMIN_SECRET=$(openssl rand -hex 16)
POSTGRES_PASSWORD=$(openssl rand -hex 16)

# Atualizar .env
sed -i "s/f569aa9c053547c496c9fa4622def3b6a9eacbf674bd18fcb26868639f02a433/$JWT_SECRET/" .env
sed -i "s/81cb994e1ac736f218ed2b605de82f93/$ADMIN_SECRET/" .env
sed -i "s/cba59e1faf37908e753cf8d8/$POSTGRES_PASSWORD/" .env

# Subir stack
docker compose up -d --build
```

### 4. Verificar Status
```bash
# Status containers
docker compose ps

# Logs
docker compose logs -f

# Aguardar SSL (30-90s)
sleep 60
```

## ✅ Testes GO/NO-GO

### Health Check API
```bash
curl -sS https://api.crsetsolutions.com/health | jq .
# Esperado: {"env":"production","status":"ok","uptime_s":X}
```

### Formulário Contacto
```bash
curl -sS -X POST https://api.crsetsolutions.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Lead QA","email":"lead@crsetsolutions.com","message":"Quero saber mais"}' | jq .
# Esperado: {"ok":true,"echo":{...}}
```

### Chat IA
```bash
curl -sS -X POST https://api.crsetsolutions.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá"}' | jq .
# Esperado: {"reply":"pong","echo":{...}}
```

### Admin Login
```bash
curl -sS -X POST https://api.crsetsolutions.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | jq .
# Esperado: {"token":"eyJ..."}
```

### Frontend HTTPS
```bash
curl -I https://crsetsolutions.com
# Esperado: HTTP/2 200
```

### Widget JavaScript
```bash
curl -I https://chat.crsetsolutions.com/widget.js
# Esperado: HTTP/2 200, Content-Type: application/javascript
```

## 🔧 Operação

### Logs
```bash
cd /opt/crset
docker compose logs -f
```

### Restart
```bash
cd /opt/crset
docker compose restart
```

### Update
```bash
cd /opt/crset
docker compose pull
docker compose up -d --build
```

### Backup BD
```bash
cd /opt/crset
docker exec $(docker ps -qf name=postgres) pg_dump -U crset -d crset > backup_$(date +%F).sql
```

## 🔒 Pós-Deploy

### Ativar Integrações Reais
```bash
# Editar .env com chaves reais
nano /opt/crset/.env

# Substituir:
# OPENAI_API_KEY=sk-proj-sua-chave-real
# RESEND_API_KEY=re_sua-chave-real

# Redeploy
docker compose up -d --build
```

## 📊 URLs Finais

- **Frontend:** https://crsetsolutions.com
- **API:** https://api.crsetsolutions.com/health
- **Admin:** https://admin.crsetsolutions.com
- **Widget:** https://chat.crsetsolutions.com/widget.js
- **GO:** https://go.crsetsolutions.com

## 🎯 Critérios GO

- [ ] /health responde 200 ✅
- [ ] Lead retorna {"ok":true} ✅
- [ ] Login admin devolve token ✅
- [ ] Frontend abre em HTTPS ✅
- [ ] Widget entregue ✅
- [ ] SSL automático funcionando ✅

---

**CRSET Solutions** - Deploy VPS Completo v1.0 🚀

