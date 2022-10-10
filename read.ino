#include <OzIDManager.h>
#include <OzNfcReader.h>
 
OzIDManager* manager;
OzNfcReader *pn532reader;
 
void setup()
{
  Serial.begin(115200);
  SPI.begin();
 
  manager = new OzIDManager;
  manager->_sendACK = true;
  manager->_checksum = true;
 
  OzCommunication::setIDManager(manager);
 
  pn532reader = new OzNfcReader(MODE::PN532);
 
  int x=1;
  manager->sendLinkSetup();
  manager->PrintWelcomeLine(pn532reader, x++,"MyPN532Nfc");
}
 
void loop()
{
    OzCommunication::communicate();
    pn532reader->ownLoop();
}
