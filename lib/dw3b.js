// dw3b.js
const fetch = import('node-fetch');

class Dw3b {
    constructor() {
      this.provider = null;
      this.providers = {
        HttpProvider: class {
          constructor(providerUrl) {
            this.providerUrl = providerUrl;
          }
        },
      };
      this.connected = false; // Track connection status
    }
  
    setProvider(providerUrl) {
      this.provider = new this.providers.HttpProvider(providerUrl);
    }
  
    async sendRequest(method, params = []) {
      if (!this.provider) {
        throw new Error('Provider is not set. Call setProvider(providerUrl) before making requests.');
      }
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: method,
          params: params,
          id: 1,
        }),
      };
  
      const response = await fetch(this.provider.providerUrl, options);
      const result = await response.json();
  
      if (result.error) {
        throw new Error(`Error calling ${method}: ${result.error.message}`);
      }
  
      return result.result;
    }
  
    async checkDw3bConnection() {
      try {
        const result = await this.sendRequest('Filecoin.MethodName');
        console.log('dw3b connection successful:', result);
        this.connected = true; // Update connection status
      } catch (error) {
        console.error('dw3b connection failed:', error);
      }
    }
  
    isConnected() {
      return this.connected;
    }
  }

module.exports = Dw3b;
