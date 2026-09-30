# Guía de Instalación: Flujo de n8n para Arthur (AI Agent)

Esta guía explica cómo importar y poner en marcha el flujo de n8n para el agente de IA **Arthur** en la Quiniela KAS.

---

## 📁 Archivo del Flujo
El flujo completo se encuentra en:
👉 `n8n/arthur-ai-chat-workflow.json`

---

## 🛠️ Arquitectura del Flujo

```
[ Frontend: Chat Arthur ]
         │  POST { message, sessionId }
         ▼
[ Webhook Node (n8n) ]
         │
         ▼
[ AI Agent: Arthur ] ◄───► [ Google Gemini Chat Model ] (gemini-1.5-flash)
         │           ◄───► [ Window Buffer Memory ] (Historial por sessionId)
         ▼
[ Respond to Webhook ]
         │  JSON { reply, sessionId, status }
         ▼
[ Frontend: Chat Arthur ]
```

---

## 🚀 Pasos para Importar en n8n

### 1. Importar el JSON en n8n
1. Abre tu instancia de n8n (ej. `http://localhost:5678`).
2. En el menú superior derecho o lateral, haz clic en **Workflows** ➔ **+ Add Workflow**.
3. Haz clic en el menú de tres puntos (**...**) en la esquina superior derecha del lienzo.
4. Selecciona **Import from File...** y elige el archivo:
   `quiniela/n8n/arthur-ai-chat-workflow.json`
   *(También puedes abrir el archivo, copiar todo el texto JSON y pegarlo directamente con `Ctrl + V` en el lienzo de n8n).*

### 2. Configurar las Credenciales del Modelo
1. Haz doble clic en el nodo **Google Gemini Chat Model**.
2. En el campo **Credential to connect with**, selecciona o crea una nueva credencial de **Google Gemini (PaLM) Api**.
3. Pega tu API Key de Google Gemini (puedes obtenerla gratuitamente en [Google AI Studio](https://aistudio.google.com/)).
4. *(Opcional)* Si prefieres usar **OpenAI**, puedes sustituir este nodo por el nodo **OpenAI Chat Model** y conectarlo al socket `Model` del AI Agent.

### 3. Activar el Workflow
1. En la esquina superior derecha de n8n, cambia el interruptor de **Inactive** a **Active**.
2. Copia la URL de Producción del Webhook (por defecto: `http://localhost:5678/webhook/arthur-chat`).

---

## ⚙️ Conexión con el Frontend

El componente [AIAssistant.tsx](file:///c:/Users/HP8D8/OneDrive/Desktop/quiniela/src/components/AIAssistant.tsx) ya está preconfigurado para comunicarse automáticamente con:
`http://localhost:5678/webhook/arthur-chat`

Si tu n8n está en otra dirección o en la nube (ej. Railway, Render, n8n Cloud), agrega la siguiente variable a tu archivo `.env`:

```env
VITE_N8N_WEBHOOK_URL="https://tu-instancia-n8n.com/webhook/arthur-chat"
```

---

## 💬 Formato de Mensajes

### Solicitud (Frontend ➔ n8n):
```json
{
  "message": "¿Qué consejos me das para apostar en la Ligue 1?",
  "sessionId": "session_a8f9d01e"
}
```

### Respuesta (n8n ➔ Frontend):
```json
{
  "reply": "¡Saludos, noble estratega! En la Ligue 1 el factor local y las bajas anotaciones suelen ser determinantes...",
  "sessionId": "session_a8f9d01e",
  "status": "success"
}
```
