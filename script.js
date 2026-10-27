const form = document.getElementById('bot-form');
const configOutput = document.getElementById('configOutput');
const previewName = document.getElementById('previewName');
const previewPrefix = document.getElementById('previewPrefix');
const previewChannel = document.getElementById('previewChannel');
const previewWelcome = document.getElementById('previewWelcome');
const previewModeration = document.getElementById('previewModeration');
const previewLogging = document.getElementById('previewLogging');
const exportBtn = document.getElementById('exportBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');

const defaultConfig = {
  botName: 'BotFlow',
  prefix: '!',
  language: 'English',
  commandChannel: '#bot-commands',
  welcomeMessage: 'Welcome to the server! Type !help to get started.',
  autoMod: true,
  welcomeEnabled: true,
  logging: true,
  music: false,
  ticketing: true,
  developerMode: false,
  logChannel: '#bot-logs'
};

function readFormValues() {
  const formData = new FormData(form);

  return {
    botName: formData.get('botName') || defaultConfig.botName,
    prefix: formData.get('prefix') || defaultConfig.prefix,
    language: formData.get('lang') || defaultConfig.language,
    commandChannel: formData.get('commandChannel') || defaultConfig.commandChannel,
    welcomeMessage: formData.get('welcomeMessage') || defaultConfig.welcomeMessage,
    autoMod: formData.get('autoMod') === 'on',
    welcomeEnabled: formData.get('welcomeEnabled') === 'on',
    logging: formData.get('logging') === 'on',
    music: formData.get('music') === 'on',
    ticketing: formData.get('ticketing') === 'on',
    developerMode: formData.get('developerMode') === 'on',
    logChannel: formData.get('logChannel') || defaultConfig.logChannel
  };
}

function renderPreview(config) {
  previewName.textContent = config.botName;
  previewPrefix.textContent = `Prefix: ${config.prefix}`;
  previewChannel.textContent = config.commandChannel;
  previewWelcome.textContent = config.welcomeEnabled ? 'Enabled' : 'Disabled';
  previewModeration.textContent = config.autoMod ? 'Enabled' : 'Disabled';
  previewLogging.textContent = config.logChannel;

  const output = JSON.stringify(config, null, 2);
  configOutput.textContent = output;
  localStorage.setItem('botConfig', output);
}

function syncFormWithConfig(config) {
  form.botName.value = config.botName;
  form.prefix.value = config.prefix;
  form.lang.value = config.language;
  form.commandChannel.value = config.commandChannel;
  form.welcomeMessage.value = config.welcomeMessage;
  form.autoMod.checked = config.autoMod;
  form.welcomeEnabled.checked = config.welcomeEnabled;
  form.logging.checked = config.logging;
  form.music.checked = config.music;
  form.ticketing.checked = config.ticketing;
  form.developerMode.checked = config.developerMode;
  form.logChannel.value = config.logChannel;
}

function saveConfig(event) {
  event.preventDefault();
  const config = readFormValues();
  renderPreview(config);
  const toast = document.createElement('div');
  toast.textContent = 'Configuration saved locally';
  toast.style.position = 'fixed';
  toast.style.right = '24px';
  toast.style.bottom = '24px';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '12px';
  toast.style.background = 'rgba(52, 211, 153, 0.14)';
  toast.style.color = '#dffcf0';
  toast.style.border = '1px solid rgba(52, 211, 153, 0.3)';
  toast.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1400);
}

function resetConfig() {
  syncFormWithConfig(defaultConfig);
  renderPreview(defaultConfig);
}

function exportConfig() {
  const config = readFormValues();
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'bot-config.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

async function copyConfig() {
  try {
    await navigator.clipboard.writeText(configOutput.textContent);
    copyBtn.textContent = 'Copied';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1200);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('input', () => {
  renderPreview(readFormValues());
});

form.addEventListener('change', () => {
  renderPreview(readFormValues());
});

form.addEventListener('submit', saveConfig);
exportBtn.addEventListener('click', exportConfig);
resetBtn.addEventListener('click', resetConfig);
copyBtn.addEventListener('click', copyConfig);

const saved = localStorage.getItem('botConfig');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    syncFormWithConfig(parsed);
    renderPreview(parsed);
  } catch (error) {
    resetConfig();
  }
} else {
  renderPreview(defaultConfig);
}
