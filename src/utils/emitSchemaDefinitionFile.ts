import { writeFile, writeFileSync } from "fs";
import { GraphQLSchema, printSchema } from "graphql";
import { Options as PrintSchemaOptions } from "graphql/utilities/schemaPrinter";
import * as path from "path";

export const defaultSchemaFilePath = path.resolve(process.cwd(), "schema.gql");

export function emitSchemaDefinitionFileSync(
  schemaFilePath: string,
  schema: GraphQLSchema,
  options: PrintSchemaOptions = { commentDescriptions: true },
) {
  const schemaString = printSchema(schema, options);
  writeFileSync(schemaFilePath, schemaString);
}

export async function emitSchemaDefinitionFile(
  schemaFilePath: string,
  schema: GraphQLSchema,
  options: PrintSchemaOptions = { commentDescriptions: true },
) {
  const schemaString = printSchema(schema, options);
  return new Promise<void>((resolve, reject) =>
    writeFile(schemaFilePath, schemaString, err => (err ? reject(err) : resolve())),
  );
}
