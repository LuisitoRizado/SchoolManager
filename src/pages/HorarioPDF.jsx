import React from 'react';
import { Document, Page, Text, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
export const HorarioPDF = () => {

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4">
          <Text>ASasdfDF</Text>
          <Image
            style={{ width: '200px', height: 'auto' }}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};
