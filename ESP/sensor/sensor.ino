#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "R$ 10,00";
const char* password = "edileneejozivall";

void setup() {


  //-------- WiFi Conection ---------//
  Serial.begin(115200);
  // Inicializar conexão Wi-Fi
  WiFi.begin(ssid, password);

  // Aguardar até que a conexão seja estabelecida
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println("");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Conexão Wi-Fi estabelecida");

  // Init dht
  dht.begin();

}


void loop() {

  float temp = dht.readTemperature();
  float umid = dht.readHumidity();

  Serial.println("| temperatura: " + String(temp) + " | umidade: " + String(umid) + " |");
  //-------- Requisição HTTP ---------//

  HTTPClient http;

  String url = "https://espnode.jockaplay.repl.co/data";
  url += "?t=" + String(temp) + "&u=" + String(umid);

  http.begin(url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.POST("");
  http.end();


  delay(1000);
}
