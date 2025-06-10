const matriculaService = require('../src/services/matriculaService');

jest.mock('../src/models/matricula');
jest.mock('../src/models/aluno');
jest.mock('../src/models/curso');

const matriculaModel = require('../src/models/matricula');
const alunoModel = require('../src/models/aluno');
const cursoModel = require('../src/models/curso');

describe('matriculaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listarTodos', () => {
    it('deve retornar a lista de matrículas', async () => {
      const listaFake = [{ id: 1, alunoId: 1, cursoId: 1 }];
      matriculaModel.listarMatriculas.mockResolvedValue(listaFake);

      const resultado = await matriculaService.listarTodos();

      expect(resultado).toEqual(listaFake);
      expect(matriculaModel.listarMatriculas).toHaveBeenCalled();
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar matrícula quando encontrada', async () => {
      const matriculaFake = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(matriculaFake);

      const resultado = await matriculaService.buscarPorId(1);

      expect(resultado).toEqual(matriculaFake);
      expect(matriculaModel.buscarMatriculaPorId).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro quando matrícula não encontrada', async () => {
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(null);

      await expect(matriculaService.buscarPorId(999))
        .rejects.toMatchObject({ status: 404, message: 'Matrícula não encontrada' });
    });
  });

  describe('criarMatricula', () => {
    it('deve criar matrícula com dados válidos', async () => {
      const dados = { alunoId: 1, cursoId: 1 };
      alunoModel.buscarAlunoPorId.mockResolvedValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockResolvedValue({ id: 1 });
      matriculaModel.listarMatriculas.mockResolvedValue([]);
      matriculaModel.adicionarMatricula.mockImplementation(async m => ({ ...m, id: 123 }));

      const resultado = await matriculaService.criarMatricula(dados);

      expect(resultado).toMatchObject({ alunoId: 1, cursoId: 1, id: 123 });
      expect(alunoModel.buscarAlunoPorId).toHaveBeenCalledWith(1);
      expect(cursoModel.buscarCursoPorId).toHaveBeenCalledWith(1);
      expect(matriculaModel.adicionarMatricula).toHaveBeenCalledWith(dados);
    });

    it('deve lançar erro se alunoId faltar', async () => {
      await expect(matriculaService.criarMatricula({ cursoId: 1 }))
        .rejects.toMatchObject({ status: 400, message: 'ID do aluno é obrigatório' });
    });

    it('deve lançar erro se cursoId faltar', async () => {
      await expect(matriculaService.criarMatricula({ alunoId: 1 }))
        .rejects.toMatchObject({ status: 400, message: 'ID do curso é obrigatório' });
    });

    it('deve lançar erro se aluno não existir', async () => {
      alunoModel.buscarAlunoPorId.mockResolvedValue(null);

      await expect(matriculaService.criarMatricula({ alunoId: 999, cursoId: 1 }))
        .rejects.toMatchObject({ status: 404, message: 'Aluno não encontrado' });
    });

    it('deve lançar erro se curso não existir', async () => {
      alunoModel.buscarAlunoPorId.mockResolvedValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockResolvedValue(null);

      await expect(matriculaService.criarMatricula({ alunoId: 1, cursoId: 999 }))
        .rejects.toMatchObject({ status: 404, message: 'Curso não encontrado' });
    });

    it('deve lançar erro se matrícula duplicada', async () => {
      alunoModel.buscarAlunoPorId.mockResolvedValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockResolvedValue({ id: 1 });
      matriculaModel.listarMatriculas.mockResolvedValue([{ alunoId: 1, cursoId: 1 }]);

      await expect(matriculaService.criarMatricula({ alunoId: 1, cursoId: 1 }))
        .rejects.toMatchObject({ status: 409, message: 'Matrícula já existe para esse aluno neste curso' });
    });
  });

  describe('atualizarMatricula', () => {
    it('deve atualizar matrícula com dados válidos', async () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockResolvedValue({ id: 2 });
      cursoModel.buscarCursoPorId.mockResolvedValue({ id: 2 });
      matriculaModel.listarMatriculas.mockResolvedValue([]);
      matriculaModel.atualizarMatricula.mockImplementation(async (id, dados) => ({ ...matriculaExistente, ...dados }));

      const dadosAtualizados = { alunoId: 2, cursoId: 2 };
      const resultado = await matriculaService.atualizarMatricula(1, dadosAtualizados);

      expect(resultado).toMatchObject(dadosAtualizados);
      expect(alunoModel.buscarAlunoPorId).toHaveBeenCalledWith(2);
      expect(cursoModel.buscarCursoPorId).toHaveBeenCalledWith(2);
      expect(matriculaModel.atualizarMatricula).toHaveBeenCalledWith(1, dadosAtualizados);
    });

    it('deve lançar erro se matrícula não existir', async () => {
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(null);

      await expect(matriculaService.atualizarMatricula(999, {}))
        .rejects.toMatchObject({ status: 404, message: 'Matrícula não encontrada para atualização' });
    });

    it('deve lançar erro se alunoId fornecido não existir', async () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockResolvedValue(null);

      await expect(matriculaService.atualizarMatricula(1, { alunoId: 999 }))
        .rejects.toMatchObject({ status: 404, message: 'Aluno não encontrado' });
    });

    it('deve lançar erro se cursoId fornecido não existir', async () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockResolvedValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockResolvedValue(null);

      await expect(matriculaService.atualizarMatricula(1, { cursoId: 999 }))
        .rejects.toMatchObject({ status: 404, message: 'Curso não encontrado' });
    });

    it('deve lançar erro se matrícula duplicada após atualização', async () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockResolvedValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockResolvedValue({ id: 2 });
      cursoModel.buscarCursoPorId.mockResolvedValue({ id: 2 });
      matriculaModel.listarMatriculas.mockResolvedValue([{ id: 2, alunoId: 2, cursoId: 2 }]);

      await expect(matriculaService.atualizarMatricula(1, { alunoId: 2, cursoId: 2 }))
        .rejects.toMatchObject({ status: 409, message: 'Já existe matrícula para este aluno neste curso' });
    });
  });

  describe('removerMatricula', () => {
    it('deve remover matrícula existente', async () => {
      matriculaModel.removerMatricula.mockResolvedValue({ id: 1 });

      const resultado = await matriculaService.removerMatricula(1);

      expect(resultado).toEqual({ id: 1 });
      expect(matriculaModel.removerMatricula).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro se matrícula não existir para remoção', async () => {
      matriculaModel.removerMatricula.mockResolvedValue(null);

      await expect(matriculaService.removerMatricula(999))
        .rejects.toMatchObject({ status: 404, message: 'Matrícula não encontrada para exclusão' });
    });
  });
});