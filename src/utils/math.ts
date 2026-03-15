import { evaluate } from 'mathjs';

export function safeEvaluate(expression: string): string {
  try {
    // Replace custom symbols with standard math symbols
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt')
      .replace(/E/g, '*10^');

    // Handle percentage
    sanitized = sanitized.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

    const result = evaluate(sanitized);
    
    if (typeof result === 'number') {
      if (!isFinite(result)) return 'Error';
      // Format to avoid long decimals
      return parseFloat(result.toPrecision(12)).toString();
    }
    return result.toString();
  } catch (error) {
    return 'Error';
  }
}
