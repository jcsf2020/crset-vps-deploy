(() => {
  // CRSET Solutions Chat Widget v2.0 - VPS Production
  console.log('🚀 CRSET Chat Widget v2.0 carregado');
  
  // Verificar se já foi inicializado
  if (window.crsetWidgetLoaded) return;
  window.crsetWidgetLoaded = true;
  
  // Criar botão flutuante
  const btn = document.createElement('div');
  btn.innerHTML = `
    <div style="
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: all 0.3s ease;
      font-size: 24px;
    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
      💬
    </div>
  `;
  
  btn.onclick = async () => {
    const msg = prompt('💬 Mensagem para o assistente CRSET:');
    if(!msg) return;
    
    try {
      const res = await fetch('https://api.crsetsolutions.com/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: msg})
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert(`🤖 Assistente CRSET: ${data.reply || 'Mensagem recebida! Nossa equipe irá responder em breve.'}`);
      } else {
        alert('❌ Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      alert('❌ Erro de conexão. Verifique sua internet e tente novamente.');
    }
  };
  
  document.body.appendChild(btn);
  
  // Adicionar estilos globais
  const style = document.createElement('style');
  style.textContent = `
    .crset-widget-btn:hover {
      transform: scale(1.1) !important;
    }
  `;
  document.head.appendChild(style);
})();

