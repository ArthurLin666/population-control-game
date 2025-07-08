import React from 'react';
import { Card, CardContent } from './components/card';
import { Button } from './components/button';

export default function PopulationControlGame() {
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <CardContent>
          <h1>Population Control Game</h1>
          <Button onClick={() => alert('Game started!')}>Start</Button>
        </CardContent>
      </Card>
    </div>
  );
}