
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular(op) {
    Keyboard.dismiss();
    let a = Number(v1.replace(',', '.'));
    let b = Number(v2.replace(',', '.'));

    if (!v1.trim() || !v2.trim() || !Number.isFinite(a) || !Number.isFinite(b)) {
      setResultado('Digite valores válidos!');
      return;
    }

    if (op === '/' && b === 0) {
      setResultado('Não pode dividir por zero!');
      return;
    }

    let r = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b;
    setResultado(String(r));
  }

  function limpar() {
    Keyboard.dismiss();
    setV1('');
    setV2('');
    setResultado('');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Calculadora Digital</Text>

      <Text>Primeiro valor:</Text>
      <TextInput style={styles.input} placeholder="Digite o primeiro valor" keyboardType="decimal-pad" value={v1} onChangeText={setV1} />

      <Text>Segundo valor:</Text>
      <TextInput style={styles.input} placeholder="Digite o segundo valor" keyboardType="decimal-pad" value={v2} onChangeText={setV2} />

      <Text style={styles.label}>Operações:</Text>
      <View style={styles.botoes}>
        {['+', '-', '*', '/'].map((item) => (
          <Pressable key={item} style={styles.operador} onPress={() => calcular(item === '×' ? '*' : item === '÷' ? '/' : item)}>
            <Text style={styles.textoOperador}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Resultado:</Text>
      <Text style={styles.resultado}>{resultado || 'Aguardando cálculo...'}</Text>
      <Button title="Limpar" onPress={limpar} color="#64748B" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#F1F5F9' },
  titulo: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginTop: 8, marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  botoes: { flexDirection: 'row', justifyContent: 'space-around' },
  operador: { width: 55, height: 50, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#64748B', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  textoOperador: { fontSize: 24, fontWeight: 'bold', color: '#1E40AF' },
  resultado: { backgroundColor: '#DBEAFE', padding: 15, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, borderRadius: 8, color: '#1E40AF' }
});
