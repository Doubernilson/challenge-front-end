import { Stepper, Step, StepLabel, Button, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import requisitarCEP from "../services/requisitarCEP";

// Passos a serem mostrador no passador
const passos = ['Passo 1', 'Passo 2', 'Passo 3'];

function PassoAPasso() {
	// Define o estado inicial do passo a passo
	const [passoAtivo, setPassoAtivo] = useState(0);
	// Define o estado inicial referente ao input de CEP
	const [cep, setCep] = useState('');
	// Define o estado inicial referente à informação geral do endereço
	const [endereco, setEndereco] = useState({});
	// Define o loading
	const [carregando, setCarregando] = useState(false);



	// Função do botão que verificará o CEP
	const handleRequisitarCEP = async (cep) => {
		await requisitarCEP(cep)
			.then((dados) => {
				setEndereco(dados)
			})
	}


	// Função para atualizar o CEP -> É chamada pelo método "onChange" do input do CEP
	const handleAtualizarCEP = event => {
		setCep(event.target.value)
	}

	// Função que retornará info no DOM de acordo com o passo atual
	const oQueRetornar = () => {
		if (passoAtivo === 0) {
			return <div style={{ display: "flex", flexDirection: 'column', width: '50%', alignItems: 'center', overflow: 'scroll', overflowX: 'hidden', height: '80%', position: 'absolute' }}>
				<h2>Insira seu nome de usuário</h2>
				<TextField style={{ width: 300 }} id="nome-usuario" label="Nome de Usuário" variant="outlined"></TextField>
			</div>

		}
		else if (passoAtivo > 0 && passoAtivo < 3) {
			return <div style={{ display: "flex", flexDirection: 'column', width: '50%', alignItems: 'center', overflow: 'scroll', overflowX: 'hidden', height: '80%', position: 'absolute' }}>
				{passoAtivo === 2 ? <h2>Confirmar Informações</h2> : <h2>Insira seu CEP e endereço</h2>}
				<TextField style={{ width: 300, paddingTop: 4 }} inputProps={{ readOnly: true }} disabled id="nome-usuario" label="Nome de Usuário" variant="outlined"></TextField>
				<TextField disabled={passoAtivo === 2} style={{ width: 300, paddingTop: 4 }} onChange={handleAtualizarCEP} id="cep-usuario" label="CEP" variant="standard" type="number"></TextField>
				{
					passoAtivo === 2 ? null : <Button variant="outlined" style={{ width: 300, paddingTop: 4 }} onClick={() => (setCarregando(true), handleRequisitarCEP(cep).then(() => setCarregando(false)))}>{carregando ? <CircularProgress style={{ width: 24, height: 24 }} /> : "Verificar"}</Button>
				}
				<TextField disabled={passoAtivo === 2} value={endereco.logradouro} style={{ width: 300, paddingTop: 4 }} id="rua-usuario" placeholder="Rua" variant="standard"></TextField>
				<TextField disabled={passoAtivo === 2} value={endereco.bairro} style={{ width: 300, paddingTop: 4 }} id="bairro-usuario" placeholder="Bairro" variant="standard"></TextField>
				<TextField disabled={passoAtivo === 2} value={endereco.localidade} style={{ width: 300, paddingTop: 4 }} id="cidade-usuario" placeholder="Cidade" variant="standard"></TextField>
				<TextField disabled={passoAtivo === 2} value={endereco.uf} style={{ width: 300, paddingTop: 4 }} id="estado-usuario" placeholder="Estado" variant="standard"></TextField>
				<TextField disabled={passoAtivo === 2} style={{ width: 300, paddingTop: 4 }} id="numero-usuario" placeholder="Número" variant="standard" type="number" ></TextField>
			</div >

		}
		else {
			return <>
				<h2>Usuário cadastrado com sucesso!</h2>
			</>
		}
	}

	// Função para passar para o próximo passo
	const handleProximo = () => {
		setPassoAtivo((passoAnterior) => passoAnterior + 1)
	}

	// Função para voltar para o passo anterior
	const handleAnterior = () => {
		setPassoAtivo((passoAnterior) => passoAnterior - 1)
	}

	return (
		<div style={{ margin: 12, height: "100%", display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
			<Stepper activeStep={passoAtivo}>
				{passos.map((passo, index) => {
					return (
						<Step key={index}>
							<StepLabel >{passo}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{/* Div Onde serão mostradas as telas de login e cadastro de acordo com o passo à passo */}
			<div className="container-infos-passo-atual" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
				{oQueRetornar()}
			</div>
			{/* Div Onde serão mostradas as telas de login e cadastro de acordo com o passo à passo */}
			<div className="container-botoes" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Button style={{ fontWeight: 'bold' }} onClick={handleAnterior} disabled={passoAtivo === 0 || passoAtivo === passos.length}>Retornar</Button>
				<Button style={{ fontWeight: 'bold' }} onClick={handleProximo} disabled={passoAtivo === passos.length}>{passoAtivo >= passos.length - 1 ? "Concluir" : "Avançar"}</Button>
			</div>

		</div>


	)
}

export default PassoAPasso;
