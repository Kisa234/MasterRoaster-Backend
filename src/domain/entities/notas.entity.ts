export class NotasEntity {
  constructor(
    public id: string,
    public name: string,
    public color: string,
    public createdAt: Date,
    public parentId?: string,
    public updatedAt?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): NotasEntity {
    const { id, name, color, createdAt, parentId, updatedAt } = obj;

    if (!id) throw new Error('id es requerido');
    if (!name) throw new Error('name es requerido');
    if (!color) throw new Error('color es requerido');
    if (!createdAt) throw new Error('createdAt es requerido');

    const newCreatedAt = new Date(createdAt);
    if (isNaN(newCreatedAt.getTime())) {
      throw new Error('createdAt no es válido');
    }

    let newUpdatedAt: Date | undefined = undefined;
    if (updatedAt !== undefined) {
      const parsed = new Date(updatedAt);
      if (isNaN(parsed.getTime())) {
        throw new Error('updatedAt no es válido');
      }
      newUpdatedAt = parsed;
    }

    return new NotasEntity(
      id,
      name,
      color,
      newCreatedAt,
      parentId,
      newUpdatedAt
    );
  }
}
