// dw3b.js
class Dw3b {
    constructor() {
      this.provider = null;
      this.providers = {
        HttpProvider: class {
          constructor(providerUrl) {
            this.providerUrl = providerUrl;
            this.connected = false; // Track connection status
          }
        },
      };
    }
  
    setProvider(providerUrl) {
      this.provider = new this.providers.HttpProvider(providerUrl);
      console.info('dw3b provider set to:', this.provider.providerUrl.providerUrl);
      this.checkDw3bConnection(); // Check connection immediately after setting provider
    }
  
    async sendRequest(method, params = []) {
      // Remaining code for sendRequest method
    }
  
    async checkDw3bConnection() {
      try {
        const response = await fetch(this.provider.providerUrl.providerUrl);
        if (response.ok) {
          this.provider.connected = true; // Update connection status
          console.log('dw3b connection successful');
        } else {
          this.provider.connected = false; // Update connection status
          console.error('dw3b connection failed');
        }
      } catch (error) {
        this.provider.connected = false; // Update connection status
        console.error('dw3b connection failed:', error);
      }
    }
  
    isConnected() {
      return this.provider && this.provider.connected;
    }
  }

module.exports = Dw3b;
