import os
import sys

def read_env_file(file_path):
    if not os.path.exists(file_path):
        return {}
    with open(file_path, 'r') as file:
        return dict(line.strip().split('=', 1) for line in file if '=' in line and not line.startswith('#'))

def write_env_file(file_path, env_vars):
    with open(file_path, 'w') as file:
        for key, value in env_vars.items():
            file.write(f"{key}={value}\n")

def merge_env_files(base_env, specific_env, output_env):
    base_vars = read_env_file(base_env)
    specific_vars = read_env_file(specific_env)
    
    # Merge variables, giving priority to specific_env
    merged_vars = {**base_vars, **specific_vars}
    
    write_env_file(output_env, merged_vars)
    print(f"Merged environment files into {output_env}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python merge_env.py <base_env_file> <specific_env_file> <output_env_file>")
        sys.exit(1)
    
    base_env = sys.argv[1]
    specific_env = sys.argv[2]
    output_env = sys.argv[3]
    
    merge_env_files(base_env, specific_env, output_env)