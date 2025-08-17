export default function Admin(){
  const login = async(e)=>{
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/admin/login`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username:e.target.u.value,password:e.target.p.value})
    });
    const data = await res.json();
    alert('Login: '+res.status+' token:'+(data.token?'OK':'NOK'));
  };
  return (
    <main style={{maxWidth:640, margin:'40px auto', fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center', marginBottom:'40px'}}>
        <h1>🔐 Admin CRSET Solutions</h1>
        <p style={{color:'#666'}}>Painel de administração e gestão de leads</p>
      </div>
      
      <div style={{background:'#f8f9fa', padding:'30px', borderRadius:'12px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
        <h2 style={{marginBottom:'20px', color:'#333'}}>Acesso Administrativo</h2>
        <form onSubmit={login} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
          <div>
            <label style={{display:'block', marginBottom:'5px', fontWeight:'bold', color:'#555'}}>Username:</label>
            <input name="u" placeholder="admin" defaultValue="admin" style={{width:'100%', padding:'12px', borderRadius:'6px', border:'1px solid #ddd', fontSize:'16px'}} />
          </div>
          <div>
            <label style={{display:'block', marginBottom:'5px', fontWeight:'bold', color:'#555'}}>Password:</label>
            <input name="p" placeholder="admin123" type="password" defaultValue="admin123" style={{width:'100%', padding:'12px', borderRadius:'6px', border:'1px solid #ddd', fontSize:'16px'}} />
          </div>
          <button style={{
            padding:'15px', 
            background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color:'white', 
            border:'none', 
            borderRadius:'6px', 
            cursor:'pointer', 
            fontWeight:'bold',
            fontSize:'16px',
            marginTop:'10px'
          }}>
            🚀 Entrar no Dashboard
          </button>
        </form>
        
        <div style={{marginTop:'30px', padding:'20px', background:'#e3f2fd', borderRadius:'8px'}}>
          <h3 style={{margin:'0 0 10px 0', color:'#1976d2'}}>📊 Funcionalidades</h3>
          <ul style={{margin:0, paddingLeft:'20px', color:'#555'}}>
            <li>Gestão de leads capturados</li>
            <li>Estatísticas de conversão</li>
            <li>Histórico de interações</li>
            <li>Configurações do sistema</li>
          </ul>
        </div>
      </div>

      <footer style={{textAlign:'center', marginTop:'40px', color:'#999', fontSize:'12px'}}>
        <p>CRSET Solutions Admin Panel v1.0</p>
      </footer>
    </main>
  );
}

