import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Heading,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';

function CodeConverter() {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [convertedCode, setConvertedCode] = useState('');
  const [debugResults, setDebugResults] = useState('');
  const [efficiencyResults, setEfficiencyResults] = useState('');
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const codeBoxRef = useRef(null);

  const handleOperationClick = async (operation) => {
    try {
      const response = await axios.post(`https://quaint-crow-gabardine.cyclic.app/${operation}`, {
        code: code,
        language: selectedLanguage,
      });

      switch (operation) {
        case 'convert':
          setConvertedCode(response.data.convertedCode.content);
          setShowCodeBox(true);
          setCopied(false); // Reset copied state
          break;
        case 'debug':
          setDebugResults(response.data.debugResults.content);
          break;
        case 'check-efficiency':
          setEfficiencyResults(response.data.efficiencyResults.content);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error ${operation} code:`, error);
    }
  };

  const copyCodeToClipboard = () => {
    if (codeBoxRef.current) {
      const codeToCopy = codeBoxRef.current.innerText;
      navigator.clipboard.writeText(codeToCopy).then(() => {
        setCopied(true);
      });
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg" py={12}>
        <VStack spacing={4} align="stretch">
          <Heading size="xl">Code Converter</Heading>
          <Select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            {/* Add more language options as needed */}
          </Select>
          <Box>
            <Editor
              height="300px"
              value={code}
              onChange={(value, event) => setCode(value)}
              language={selectedLanguage}
            />
          </Box>
          <Button colorScheme="blue" onClick={() => handleOperationClick('convert')}>
            Convert
          </Button>
          <Button colorScheme="blue" onClick={() => handleOperationClick('debug')}>
            Debug
          </Button>
          <Button colorScheme="blue" onClick={() => handleOperationClick('check-efficiency')}>
            Check Efficiency
          </Button>
          {showCodeBox && (
            <Box borderWidth="1px" borderRadius="md" p={4} borderColor="gray.200" ref={codeBoxRef}>
              <Heading size="md">Converted Code:</Heading>
              <pre>{convertedCode}</pre>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={copyCodeToClipboard}
                disabled={copied}
                mt={2}
              >
                {copied ? 'Code Copied' : 'Copy Code'}
              </Button>
            </Box>
          )}
          <Box>
            <Heading size="md">Debug Results:</Heading>
            <pre>{debugResults}</pre>
          </Box>
          <Box>
            <Heading size="md">Efficiency Results:</Heading>
            <pre>{efficiencyResults}</pre>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default CodeConverter;
