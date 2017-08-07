using Autofac;
using CooList.WebApi.DataAccess;
using CooList.WebApi.DataAccess.Interfaces;

namespace CooList.WebApi.Configuration
{
    public static class Autofac
    {
        public static ContainerBuilder GetConfiguredBuilder()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<PointListRepository>().As<IPointListRepository>();
            builder.RegisterType<CoordinateRepository>().As<ICoordinateRepository>();
            builder.Register(cfg => new PointListUnitOfWork(
                cfg.Resolve<IPointListRepository>(),
                cfg.Resolve<ICoordinateRepository>(),
                "")).As<IPointListUnitOfWork>();
            return builder;
        }
    }
}
