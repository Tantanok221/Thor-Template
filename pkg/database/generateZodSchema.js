import  fs  from 'fs';
import path   from "path";
import { Project, SourceFile, VariableDeclarationKind } from 'ts-morph';
const project = new Project();

// Add your schema file
const schemaFile = project.addSourceFileAtPath('./src/db/schema.ts');

// Create the output directory if it doesn't exist
const outputDir = './src/zod';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to capitalize the first letter
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Array to store names of generated schema files
const generatedSchemas = [];

// Process each exported variable in the schema file
schemaFile.getVariableDeclarations().forEach((declaration) => {
  if (declaration.isExported()) {
    const name = declaration.getName();
    const outputPath = path.join(outputDir, `${name}.ts`);
    
    const outputFile = project.createSourceFile(outputPath, '', { overwrite: true });
    
    // Add imports
    outputFile.addImportDeclaration({
      namedImports: ['createInsertSchema', 'createSelectSchema'],
      moduleSpecifier: 'drizzle-zod',
    });
    outputFile.addImportDeclaration({
      namedImports: ['z'],
      moduleSpecifier: 'zod',
    });
    outputFile.addImportDeclaration({
      namedImports: ['s'],
      moduleSpecifier: '../db/index.js',
    });
    
    // Add schema declarations
    outputFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [{
        name: `${name}InsertSchema`,
        initializer: `createInsertSchema(s.${name})`,
      }],
    });
    outputFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [{
        name: `${name}SelectSchema`,
        initializer: `createSelectSchema(s.${name})`,
      }],
    });
    
    // Add type declarations
    outputFile.addTypeAlias({
      isExported: true,
      name: `zod${capitalize(name)}InsertSchema`,
      type: `z.infer<typeof ${name}InsertSchema>`,
    });
    outputFile.addTypeAlias({
      isExported: true,
      name: `zod${capitalize(name)}SelectSchema`,
      type: `z.infer<typeof ${name}SelectSchema>`,
    });

    // Save the generated schema file
    outputFile.saveSync();
    
    // Add the name to the list of generated schemas
    generatedSchemas.push(name);
  }
});

// Create index.ts file
const indexPath = path.join(outputDir, 'index.ts');
const indexFile = project.createSourceFile(indexPath, '', { overwrite: true });

// Add imports for all generated schemas
generatedSchemas.forEach(name => {
  indexFile.addImportDeclaration({
    namespaceImport: name,
    moduleSpecifier: `./${name}.js`,
  });
});

// Add export statement
indexFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  isExported: true,
  declarations: [{
    name: 'zodSchema',
    initializer: `{ ${generatedSchemas.join(', ')} }`,
  }],
});

// Save the index file
indexFile.saveSync();

console.log('Zod schema files and index.ts generated successfully!');