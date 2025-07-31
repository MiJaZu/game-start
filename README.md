# Game-P 🎮

Un juego desarrollado con **React**, **TypeScript**, **Phaser** y **Socket.IO** siguiendo principios de **Arquitectura Hexagonal**.

## 🚀 Tecnologías

- **Frontend**: React 19 + TypeScript + Vite
- **Game Engine**: Phaser 3.90
- **Backend**: NestJS (en `game-p-server`)
- **WebSockets**: Socket.IO para multijugador
- **Linting**: ESLint + Prettier
- **Build Tool**: Vite

## 📁 Estructura del Proyecto

```
game-p/
├── src/
│   ├── Domain/              # Entidades de negocio
│   │   └── Player.ts
│   ├── Infrastructure/      # Implementaciones técnicas
│   │   ├── GamePhaser.ts    # Motor del juego principal
│   │   ├── PlayerPhaser.ts  # Implementación del jugador
│   │   ├── AssetsLoader.ts  # Cargador de assets
│   │   ├── assets/          # Configuración de assets
│   │   │   └── TutorialAssets/
│   │   └── GameScenes/      # Escenas del juego
│   │       └── TutorialScenes/
│   ├── App.tsx             # Componente principal React
│   └── main.tsx           # Punto de entrada
├── public/                # Assets estáticos
└── others/               # Recursos de tutorial
```

## 🎯 Arquitectura Hexagonal

El proyecto sigue el patrón de **Arquitectura Hexagonal**:

- **Domain**: Lógica de negocio pura (`Player`, entidades del juego)
- **Application**: Casos de uso (será implementado)
- **Infrastructure**: Detalles técnicos (Phaser, Socket.IO, React)

### Separación de Responsabilidades:

- **GameEngine**: Orquestador principal del juego
- **GameScene**: Manejo de escenas específicas (Boss1, Boss2, etc.)
- **Assets**: Configuración centralizada de recursos
- **Player**: Entidad de dominio con implementación en Phaser

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd game-p

# Instalar dependencias
npm install

# Instalar dependencias del servidor
cd ../game-p-server
npm install
```

### Desarrollo

```bash
# Iniciar el frontend (puerto 5173)
npm run dev

# En otra terminal, iniciar el servidor (puerto 3000)
cd ../game-p-server
npm run start:dev
```

### Scripts Disponibles

```bash
# Frontend
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formato

# Backend (game-p-server)
npm run start:dev    # Servidor de desarrollo
npm run start        # Servidor de producción
npm run test         # Tests unitarios
```

## 🎮 Características del Juego

- **Multijugador**: Conexión en tiempo real con Socket.IO
- **Física**: Sistema de física arcade con Phaser
- **Escenas modulares**: Boss1, Boss2, Menu, GameOver
- **Assets dinámicos**: Sistema de carga de recursos configurable
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🔧 Configuración

### Prettier
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Socket.IO
El cliente se conecta por defecto a `http://localhost:3000`. 
Configurable en `src/Infrastructure/TrashTest/socket-0.ts`.

## 🚧 Estado del Desarrollo

- ✅ Configuración base con React + Phaser
- ✅ Arquitectura hexagonal implementada
- ✅ Sistema de assets configurable
- ✅ Conexión Socket.IO básica
- ✅ ESLint + Prettier configurados
- 🔄 Implementación de escenas múltiples
- 🔄 Sistema de entidades de dominio
- ⏳ Casos de uso de aplicación
- ⏳ Tests unitarios

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🔗 Enlaces Relacionados

- [Phaser 3 Documentation](https://phaser.io/phaser3)
- [Socket.IO Documentation](https://socket.io/docs/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Vite Documentation](https://vitejs.dev/)
