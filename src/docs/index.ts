import path from 'path';

export class DocsLocationFactory {
  private static readonly registry = new Map<string, string>();

  static {
    this.registry.set('development', path.join(__dirname, '/..', '/..', '/dist', '/docs'));
    this.registry.set('production', path.join(__dirname, '/..', '/docs'));
  }

  create(): string {
    return DocsLocationFactory.registry.get(process.env.NODE_ENV || 'development') || '';
  }
}
