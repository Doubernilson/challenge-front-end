import axios from 'axios';

const requisitarCEP = async (cep) => {
	let dados = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
		.then((resposta) => {
			return resposta.data
		})
		.catch((erro) => {
			return erro
		})
	return dados
}

export default requisitarCEP;
