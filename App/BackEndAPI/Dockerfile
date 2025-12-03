FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /app

COPY . .
RUN dotnet restore
RUN dotnet build -c Release

EXPOSE 5000

CMD ["dotnet", "run", "--urls", "http://0.0.0.0:5000"]
