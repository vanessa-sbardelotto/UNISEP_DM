import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from "react-native";

export default function Home() {

const [usuario, setUsuario] = useState(); 
const [senha, setSenha] = useState();

    return (
        <View style={styles.home}>

            <Text style={styles.texto}>
                Usuario: {usuario}
            </Text>

             <Text style={styles.texto}>
                Senha: {senha}
            </Text>

            <TextInput 
                style={styles.input}
                placeholder="Usuário"
                onChangeText={setUsuario}/>

            <TextInput 
                style={styles.input}
                placeholder="Senha"
                onChangeText={setSenha}/>
        

            <View style={styles.btn}>
                <Button title="Entrar"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        backgroundColor: '#204CC7'
    },
    texto: {
        fontSize: 20,
        color: '#ffff'
    },
    btn: {
        height: 40,
        width: 100,
    },
    input: {
        height: 40,
        width: 500,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }

});