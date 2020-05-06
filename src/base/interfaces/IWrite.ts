
interface IWrite <T> {
    create(values): Promise<T>;
    update(newValues, options): Promise<T>;
    delete(options): Promise<T>;
}

export default IWrite