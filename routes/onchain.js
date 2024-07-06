var express = require('express');
var router = express.Router();
var { ethers } = require('ethers');

// Ensure environment variables are set
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const anthropicContract = process.env.ANTHROPIC_CONTRACT;

const ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "initialOracleAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "getMessageHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "role",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "contentType",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                }
              ],
              "internalType": "struct IOracle.Content[]",
              "name": "content",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct IOracle.Message[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "runId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "functionName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "functionArguments",
              "type": "string"
            },
            {
              "internalType": "uint64",
              "name": "created",
              "type": "uint64"
            },
            {
              "internalType": "string",
              "name": "model",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "systemFingerprint",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "object",
              "type": "string"
            },
            {
              "internalType": "uint32",
              "name": "completionTokens",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "promptTokens",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "totalTokens",
              "type": "uint32"
            }
          ],
          "internalType": "struct IOracle.OpenAiResponse",
          "name": "_response",
          "type": "tuple"
        },
        {
          "internalType": "string",
          "name": "_errorMessage",
          "type": "string"
        }
      ],
      "name": "onOracleOpenAiLlmResponse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "response",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "sendMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

// Set up the provider and wallet
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(anthropicContract, ABI, wallet);

router.post('/send-message', async function(req, res, next) {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message content is required' });
    }

    try {
        // Send the message
        const transactionResponse = await contract.sendMessage(message);
        const receipt = await transactionResponse.wait();
        console.log(`Message sent, tx hash: ${receipt.transactionHash}`);
        console.log(`Chat started with message: "${message}"`);

        // Poll for the response
        let response;
        while (true) {
            response = await contract.response();
            if (response) {
                console.log("Response from contract:", response);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
