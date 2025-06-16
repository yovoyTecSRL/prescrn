document.getElementById('btn').onclick = async () => {
  const res = await fetch('/api/hello');
  const data = await res.json();
  document.getElementById('respuesta').textContent = data.message;
};