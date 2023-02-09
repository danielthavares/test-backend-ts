import {
  BaseResponse,
  failure,
  success,
  failureOnlyMessage,
} from "../common/base-response";
import { MemoryDatabase } from "../database/memory-database";
import { News } from "../models/news";

interface NewsFailures {
  title?: string[];
  description?: string[];
}

export class NewsService {
  private _memoryDatabase: MemoryDatabase;

  constructor() {
    this._memoryDatabase = new MemoryDatabase();
  }

  insert(data: News): BaseResponse {
    let failures: NewsFailures = {};

    if (!data.getTitle()) {
      failures.title = ["O campo título é obrigatório."];
    }

    if (!data.getDescription()) {
      failures.description = ["O campo descrição é obrigatório."];
    }

    if (failures.title || failures.description) {
      return failure(null, undefined, failures);
    }

    const record = this._memoryDatabase.insert(data);

    return success(record, "Registro criado com sucesso.");
  }

  all(): BaseResponse {
    const records = this._memoryDatabase.findAll();

    if (records.length === 0) {
      return failureOnlyMessage("Nenhum registro encontrado.");
    }

    return success(records);
  }

  findById(id: number): BaseResponse {
    const record = this._memoryDatabase.findById(id);

    if (record) {
      return success(record);
    }

    return failureOnlyMessage("Nenhum registro encontrado.");
  }

  update(id: number, data: News): BaseResponse {
    const exist = this.findById(id);

    if (exist.success() === false) return exist;

    let failures: NewsFailures = {};

    if (!data.getTitle()) {
      failures.title = ["O campo título é obrigatório."];
    }

    if (!data.getDescription()) {
      failures.description = ["O campo descrição é obrigatório."];
    }

    if (failures.title || failures.description) {
      return failure(null, undefined, failures);
    }

    const lines = this._memoryDatabase.update(id, data);

    if (lines === 0)
      return failureOnlyMessage("Não foi possível atualizar o registro.");

    return success(null, "Registro atualizado com sucesso.");
  }

  remove(id: number): BaseResponse {
    const exist = this.findById(id);

    if (exist.success() === false) return exist;

    const lines = this._memoryDatabase.remove(id);

    if (lines === 0)
      return failureOnlyMessage("Não foi possível remover o registro.");

    return success(null, "Registro removido com sucesso.");
  }
}
