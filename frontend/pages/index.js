export default function Home(){
  const submit = async(e)=>{
    e.preventDefault();
    const body = {name:e.target.name.value,email:e.target.email.value,message:e.target.message.value};
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/contact`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    alert('Lead enviada: '+res.status);
  };
  return (
    <main style={{maxWidth:640, margin:'40px auto', fontFamily:'sans-serif'}}>
      <h1>🚀 CRSET Solutions</h1>
      <p><strong>IA, Automação e Inovação Tecnológica</strong></p>
      <p>Transformamos a sua empresa com soluções inteligentes de automação e inteligência artificial.</p>
      
      <div style={{background:'#f8f9fa', padding:'20px', borderRadius:'8px', margin:'20px 0'}}>
        <h2>💼 Os Nossos Serviços</h2>
        <ul>
          <li><strong>Automação de Processos:</strong> Otimize workflows e reduza custos operacionais</li>
          <li><strong>Chatbots IA:</strong> Atendimento ao cliente 24/7 com inteligência artificial</li>
          <li><strong>Análise de Dados:</strong> Insights inteligentes para decisões estratégicas</li>
          <li><strong>Integração de Sistemas:</strong> Conecte todas as suas ferramentas numa só plataforma</li>
        </ul>
      </div>

      <div style={{background:'#e3f2fd', padding:'20px', borderRadius:'8px', margin:'20px 0'}}>
        <h2>📞 Contacte-nos</h2>
        <p>Pronto para transformar o seu negócio? Fale connosco!</p>
        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          <input name="name" placeholder="Nome completo" required style={{padding:'10px', borderRadius:'4px', border:'1px solid #ddd'}} />
          <input name="email" type="email" placeholder="Email profissional" required style={{padding:'10px', borderRadius:'4px', border:'1px solid #ddd'}} />
          <textarea name="message" placeholder="Como podemos ajudar a sua empresa?" required style={{padding:'10px', borderRadius:'4px', border:'1px solid #ddd', minHeight:'80px'}} />
          <button type="submit" style={{padding:'12px', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>
            🚀 Solicitar Proposta
          </button>
        </form>
      </div>

      <footer style={{textAlign:'center', marginTop:'40px', color:'#666', fontSize:'14px'}}>
        <p>© 2025 CRSET Solutions - Todos os direitos reservados</p>
        <p>📧 ops@crsetsolutions.com | 🌐 crsetsolutions.com</p>
      </footer>
    </main>
  );
}

