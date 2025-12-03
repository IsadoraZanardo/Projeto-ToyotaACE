FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY . .
RUN dotnet restore
RUN dotnet build -c Release

EXPOSE 80

CMD ["dotnet", "run"]
