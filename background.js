chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'MUDANCA_DETECTADA' || message.type === 'INGRESSO_DISPONIVEL') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
      title: 'Mudança na página!',
      message: 'Pode ter liberado ingressos!'
    });
  }
});