const matriculaService = require('../src/services/matriculaService');

// Vamos fazer mocks simples para os models
jest.mock('../src/models/matricula');
jest.mock('../src/models/aluno');
jest.mock('../src/models/curso');

const matriculaModel = require('../src/models/matricula');
const alunoModel = require('../src/models/aluno');
const cursoModel = require('../src/models/curso');

describe('matriculaService', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe('listarTodos', () => {
    it('deve retornar a lista de matrículas', () => {
      const listaFake = [{ id: 1, alunoId: 1, cursoId: 1 }];
      matriculaModel.listarMatriculas.mockReturnValue(listaFake);

      const resultado = matriculaService.listarTodos();

      expect(resultado).toEqual(listaFake);
      expect(matriculaModel.listarMatriculas).toHaveBeenCalled();
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar matrícula quando encontrada', () => {
      const matriculaFake = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockReturnValue(matriculaFake);

      const resultado = matriculaService.buscarPorId(1);

      expect(resultado).toEqual(matriculaFake);
      expect(matriculaModel.buscarMatriculaPorId).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro quando matrícula não encontrada', () => {
      matriculaModel.buscarMatriculaPorId.mockReturnValue(null);

      expect(() => matriculaService.buscarPorId(999))
        .toThrow(expect.objectContaining({ status: 404, message: 'Matrícula não encontrada' }));
    });
  });

  describe('criarMatricula', () => {
    it('deve criar matrícula com dados válidos', () => {
      const dados = { alunoId: 1, cursoId: 1 };
      alunoModel.buscarAlunoPorId.mockReturnValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockReturnValue({ id: 1 });
      matriculaModel.listarMatriculas.mockReturnValue([]);
      matriculaModel.adicionarMatricula.mockImplementation(m => ({ ...m, id: 123 }));

      const resultado = matriculaService.criarMatricula(dados);

      expect(resultado).toMatchObject({ alunoId: 1, cursoId: 1, id: 123 });
      expect(alunoModel.buscarAlunoPorId).toHaveBeenCalledWith(1);
      expect(cursoModel.buscarCursoPorId).toHaveBeenCalledWith(1);
      expect(matriculaModel.adicionarMatricula).toHaveBeenCalled();
    });

    it('deve lançar erro se alunoId faltar', () => {
      expect(() => matriculaService.criarMatricula({ cursoId: 1 }))
        .toThrow(expect.objectContaining({ status: 400, message: 'ID do aluno é obrigatório' }));
    });

    it('deve lançar erro se cursoId faltar', () => {
      expect(() => matriculaService.criarMatricula({ alunoId: 1 }))
        .toThrow(expect.objectContaining({ status: 400, message: 'ID do curso é obrigatório' }));
    });

    it('deve lançar erro se aluno não existir', () => {
      alunoModel.buscarAlunoPorId.mockReturnValue(null);

      expect(() => matriculaService.criarMatricula({ alunoId: 999, cursoId: 1 }))
        .toThrow(expect.objectContaining({ status: 404, message: 'Aluno não encontrado' }));
    });

    it('deve lançar erro se curso não existir', () => {
      alunoModel.buscarAlunoPorId.mockReturnValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockReturnValue(null);

      expect(() => matriculaService.criarMatricula({ alunoId: 1, cursoId: 999 }))
        .toThrow(expect.objectContaining({ status: 404, message: 'Curso não encontrado' }));
    });

    it('deve lançar erro se matrícula duplicada', () => {
      alunoModel.buscarAlunoPorId.mockReturnValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockReturnValue({ id: 1 });
      matriculaModel.listarMatriculas.mockReturnValue([{ alunoId: 1, cursoId: 1 }]);

      expect(() => matriculaService.criarMatricula({ alunoId: 1, cursoId: 1 }))
        .toThrow(expect.objectContaining({ status: 409, message: 'Matrícula já existe para esse aluno neste curso' }));
    });
  });

  describe('atualizarMatricula', () => {
    it('deve atualizar matrícula com dados válidos', () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockReturnValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockReturnValue({ id: 2 });
      cursoModel.buscarCursoPorId.mockReturnValue({ id: 2 });
      matriculaModel.listarMatriculas.mockReturnValue([]);
      matriculaModel.atualizarMatricula.mockImplementation((id, dados) => ({ ...matriculaExistente, ...dados }));

      const dadosAtualizados = { alunoId: 2, cursoId: 2 };
      const resultado = matriculaService.atualizarMatricula(1, dadosAtualizados);

      expect(resultado).toMatchObject(dadosAtualizados);
      expect(alunoModel.buscarAlunoPorId).toHaveBeenCalledWith(2);
      expect(cursoModel.buscarCursoPorId).toHaveBeenCalledWith(2);
      expect(matriculaModel.atualizarMatricula).toHaveBeenCalledWith(1, dadosAtualizados);
    });

    it('deve lançar erro se matrícula não existir', () => {
      matriculaModel.buscarMatriculaPorId.mockReturnValue(null);

      expect(() => matriculaService.atualizarMatricula(999, {}))
        .toThrow(expect.objectContaining({ status: 404, message: 'Matrícula não encontrada para atualização' }));
    });

    it('deve lançar erro se alunoId fornecido não existir', () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockReturnValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockReturnValue(null);

      expect(() => matriculaService.atualizarMatricula(1, { alunoId: 999 }))
        .toThrow(expect.objectContaining({ status: 404, message: 'Aluno não encontrado' }));
    });

    it('deve lançar erro se cursoId fornecido não existir', () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockReturnValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockReturnValue({ id: 1 });
      cursoModel.buscarCursoPorId.mockReturnValue(null);

      expect(() => matriculaService.atualizarMatricula(1, { cursoId: 999 }))
        .toThrow(expect.objectContaining({ status: 404, message: 'Curso não encontrado' }));
    });

    it('deve lançar erro se matrícula duplicada após atualização', () => {
      const matriculaExistente = { id: 1, alunoId: 1, cursoId: 1 };
      matriculaModel.buscarMatriculaPorId.mockReturnValue(matriculaExistente);
      alunoModel.buscarAlunoPorId.mockReturnValue({ id: 2 });
      cursoModel.buscarCursoPorId.mockReturnValue({ id: 2 });
      matriculaModel.listarMatriculas.mockReturnValue([{ id: 2, alunoId: 2, cursoId: 2 }]);

      expect(() => matriculaService.atualizarMatricula(1, { alunoId: 2, cursoId: 2 }))
        .toThrow(expect.objectContaining({ status: 409, message: 'Já existe matrícula para este aluno neste curso' }));
    });
  });

  describe('removerMatricula', () => {
    it('deve remover matrícula existente', () => {
      matriculaModel.removerMatricula.mockReturnValue({ id: 1 });

      const resultado = matriculaService.removerMatricula(1);

      expect(resultado).toEqual({ id: 1 });
      expect(matriculaModel.removerMatricula).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro se matrícula não existir para remoção', () => {
      matriculaModel.removerMatricula.mockReturnValue(null);

      expect(() => matriculaService.removerMatricula(999))
        .toThrow(expect.objectContaining({ status: 404, message: 'Matrícula não encontrada para exclusão' }));
    });
  });
});