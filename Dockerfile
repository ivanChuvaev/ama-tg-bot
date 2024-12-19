# Используем последний образ Ubuntu
FROM ubuntu:latest

# Устанавливаем необходимые пакеты
RUN apt-get update && \
    apt-get install -y git curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Клонируем репозиторий
RUN git clone https://github.com/ivanChuvaev/ama-tg-bot.git /app

# Переходим в директорию приложения
WORKDIR /app

# Устанавливаем зависимости и собираем проект
RUN npm install -g yarn && \
    yarn install && \
    yarn build

EXPOSE 8080
 
# Запускаем приложение
CMD ["yarn", "start"]