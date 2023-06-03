python 安装依赖
```
--use-deprecated=legacy-resolver
```
nodejs 安装依赖
```

```

初始化
```
./manage.py database create_tables
```

```
yarn build
```

运行
```
./manage.py runserver --debugger --reload
./manage.py rq worker
./manage.py rq scheduler
yarn watch
```