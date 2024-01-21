import os
import json

# const
DIRECTORY_PATH_FOR_DEBUG = './i18n_test' # relative path to the containing json files
DIRECTORY_PATH = './i18n' # relative path to the containing json files
PREFIX = 'STRID_'
INVALID_STRING_LIST = '&%$#' # invalid string in json key

# console color
CONSOLE_END = '\033[0m'
CONSOLE_RED = '\033[31m'
CONSOLE_GREEN = '\033[32m'
CONSOLE_YELLOW = '\033[33m'

def console_log(msg):
    print(f"{CONSOLE_GREEN}{msg}{CONSOLE_END}")

def console_error(msg):
    print(f"{CONSOLE_RED}{msg}{CONSOLE_END}")

def console_warning(msg):
    print(f"{CONSOLE_YELLOW}{msg}{CONSOLE_END}")

def get_all_json_path():
    path_list = []
    for filename in os.listdir(DIRECTORY_PATH_FOR_DEBUG):
        if filename.endswith('.json'): # pickup only json file
            path_list.append(filename)
    return path_list

def check_json_decode_error(file_name):
    try:
        with open(f'{DIRECTORY_PATH_FOR_DEBUG}/{file_name}', 'r', encoding='UTF-8') as json_file:
            data = json.load(json_file)
            res_data = {
                'file': file_name,
                'keys': data.keys(),
                'value': data.values()
            }
        return True, res_data
    except json.JSONDecodeError as err:
        error = f"{CONSOLE_RED}'{file_name}'に構文エラーが見つかりました。 : {err}{CONSOLE_END}"
        # error = CONSOLE_RED + file_name + "に構文エラーが見つかりました。" + err + CONSOLE_END
        error_data = { 'file': file_name, 'error_msg': error}
        return False, error_data
    except FileNotFoundError:
        error = f"{CONSOLE_YELLOW}{file_name}ファイルが見つかりません。{CONSOLE_END}"
        # error = CONSOLE_YELLOW + file_name + "ファイルが見つかりません。" + CONSOLE_END
        error_data = { 'file': file_name, 'error_msg': error}
        return False, error_data
    
def get_json_data(file_list):
    json_data_list = []
    error_msg_list = []
    for file in file_list:
        valid, res_data = check_json_decode_error(file)
        if valid:
            json_data_list.append(res_data)
        else:
            error_msg_list.append(res_data)
    return json_data_list, error_msg_list

def check_invalid_string(file, keys):
    all_clear = True
    prefix_len = len(PREFIX)
    for key in keys:
        prefix = key[:prefix_len]
        if PREFIX != prefix:
            console_error(f"{file}内の'{key}'が{PREFIX}で始まっていません。")
            all_clear = False
        temp = key.split()
        if len(temp) > 1:
            console_error(f"{file} : '{key}'に半角スペースが含まれています。")
            all_clear = False
        temp = key.split('_')
        invalid = any('' == str in str for str in temp)
        if invalid:
            console_error(f"{file} : '{key}'にアンダーバーが連続して使用されています。")
            all_clear = False
        invalid = any(char in key for char in INVALID_STRING_LIST)
        if invalid:
            console_error(f"{file} : '{key}'に不正文字が使用されています。")
            all_clear = False
    if all_clear:
        console_log(f"'{file}' : ファイル内Keyについて以下のチェックが完了しました。")
        print(f"■ prefixが'{PREFIX}'で始まっていること。")
        print('■ 半角スペースが使用されていないこと。')
        print('■ アンダーバーが連続して使用されていないこと。')
        print(f"■ 不正文字({INVALID_STRING_LIST})が使用されていないこと。")

def json_keys_check(json_data_list):
    for json_data in json_data_list:
        check_invalid_string(json_data['file'], json_data['keys'])

    


if __name__ == '__main__':
    # get all file name
    json_file_list = get_all_json_path()
    
    # syntax error check
    print('Jsonファイルの構文チェックを行います...')
    json_data_list, error_msg_list = get_json_data(json_file_list)
    if error_msg_list:
        for msg_error in error_msg_list:
            console_error(msg_error['error_msg'])
        console_warning('一度でファイル内のすべてのエラーを検知できません。')
        console_warning('修正後、再実施すると別のエラーが見つかる可能性があります。')
    else:
        console_log('すべてのファイルが正常です。')

    # json key check
    print('JsonファイルのKeyのチェックを行います...')
    json_keys_check(json_data_list)